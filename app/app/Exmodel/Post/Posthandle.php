<?php

namespace Endnix\Exmodel\Post;

use ArangoDBClient\Connection as ArangoConnection;
use ArangoDBClient\Statement as ArangoStatement;
use ArangoDBClient\Exception as ArangoException;

use ArangoDBClient\Document as ArangoDocument;
use ArangoDBClient\DocumentHandler as ArangoDocumentHandler;

use ArangoDBClient\Edge as ArangoEdge;
use ArangoDBClient\EdgeHandler as ArangoEdgeHandler;

use Endnix\Exmodel\Dbconfig;

class Posthandle
{
    private $connection ;
    
    public function __construct() 
    {
        $dbcfg = new Dbconfig();
        $connectionOptions = $dbcfg->getcfg();
        $this->connection = new ArangoConnection($connectionOptions);
    }

    public function NewTopic($_topic,$_content,$_user)
    {
        $datetime = strtotime(now());

        $docHandler = new ArangoDocumentHandler($this->connection);
        $edgeHandler = new ArangoEdgeHandler($this->connection);

        $userResult = $docHandler->get('d_user','d_user/'.$_user);
        $userId = $userResult->getId();

        // Start ---- d_content
        $dContent = new ArangoDocument();
        $dContent->content_create = (int) $datetime;
        $dContent->content_edit = (int) $datetime;
        $dContent->content_edit_count = (int) 0;

        $dContent->content_vote_up = array(
            'up_like' => (int) 0,
            'up_love' => (int) 0,
            'up_good' => (int) 0,
            'up_lol' => (int) 0
        );

        $dContent->content_vote_down = array(
            'down_dislike' => (int) 0,
            'down_hate' => (int) 0,
            'down_bad' => (int) 0,
            'down_sad' => (int) 0
        );
        
        $dContent->content_endorsement = array(
            'es_helpful' => (int) 0,
            'es_truth' => (int) 0,
            'es_happy' => (int) 0,
            'es_positive' => (int) 0
        );

        $dContent->content_status = array(
            'status_lock' => (int)0, 
            'status_hide' => (int)0, 
            'status_pin' => (int)0
        );

        $dContent->content_type = (string)"topic";

        $dContentId = $docHandler->save('d_content',$dContent);
        // End ---- d_content

        // Start ---- d_content_header
        $dContentHeader = new ArangoDocument();
        $dContentHeader->content_topic_name = $_topic;
        $dContentHeader->content_topic_info = array('n_comment' => (int) 0 ,'n_follow' => (int) 0);

        $dContentHeaderId = $docHandler->save('d_content_header',$dContentHeader);
        // End ---- d_content_header

        // Start ---- d_content_article
        $dContentArticle = new ArangoDocument();
        $dContentArticle->content_article = $_content;
        $dContentArticle->content_timeline = $datetime;

        $dContentArticleId = $docHandler->save('d_content_article',$dContentArticle);
        // End ---- d_content_article

        $eContentHeader = new ArangoEdge();
        $eContentHeader->label = "content_header";
        $edgeHandler->saveEdge('e_content',  $dContentId, $dContentHeaderId  ,$eContentHeader);

        $eContentAritcel = new ArangoEdge();
        $eContentAritcel->label = "content_article";
        $edgeHandler->saveEdge('e_content',  $dContentId, $dContentArticleId  ,$eContentAritcel);

        $eContentUser = new ArangoEdge();
        $eContentUser->label = "user_topic";
        $edgeHandler->saveEdge('e_content',  $userId, $dContentId  ,$eContentUser);


    }

    public function GetTopicTitle($_keytopic)
    {
        $q_info = '
            FOR c IN d_content
                FILTER c._key == @topickey && c.content_type == "topic"

                    LET c_header = 
                    (
                        FOR v, e, p IN OUTBOUND c._id e_content
                        FILTER p.edge[*].label ALL == "content_header"
                        LIMIT 1
                        return  
                        {
                            c_topicname : v.content_topic_name
                        }
                    )
                    
                    LET c_body = 
                    (
                        FOR v, e, p IN OUTBOUND c._id e_content
                        FILTER p.edge[*].label ALL == "content_article"
                        SORT v.content_timeline DESC
                        LIMIT 1
                        return  
                        {
                            c_article : v.content_article
                        }
                    )
                    
                return 
                {
                    c_title : c_header[0].c_topicname ,
                    c_article : c_body[0].c_article
                }
        ';

        $s_info = new ArangoStatement($this->connection,[
            'query' => $q_info ,
            'bindVars' => 
                [
                    'topickey' => (string)$_keytopic
                ]
        ]);

        /*
        $c_info = $s_info->execute();
        $g_info = $c_info->getMetadata();
        $t_info = $s_info->execute()->getMetadata()
        $getall = json_encode($g_info['result']);
        */
        $t_info = json_encode($s_info->execute()->getMetadata()['result']);
        //print_r($t_info);

        return $t_info;
    }

    public function GetTopicList()
    {
        $q_info = '
        FOR c IN d_content
            FILTER c.content_type == "topic"
            LET c_header = 
            (
                FOR v_c, e_c, p_c IN OUTBOUND c._id e_content
                FILTER p_c.edge[*].label ALL == "content_header"
                LIMIT 1
                return  
                {
                    c_topicname : v_c.content_topic_name
                }
            )

            LET c_user = 
            (
                FOR v, e, p IN INBOUND c._id e_content
                FILTER p.edge[*].label ALL == "user_topic"
                LIMIT 1
                return  
                {
                    c_usertopic : v.userdisply
                }
            )
        
            SORT c.content_create DESC
            
        return 
        {
            c_key : c._key,
            c_topicname : c_header[0].c_topicname ,
            c_create : c.content_create ,
            c_userby : c_user[0].c_usertopic,
            
            c_up : c.content_vote_up ,
            c_up_total : 
            c.content_vote_up.up_like + c.content_vote_up.up_love +
            c.content_vote_up.up_good + c.content_vote_up.up_lol ,
            
            c_down : c.content_vote_down ,
            c_down_total : 
            c.content_vote_down.down_dislike + c.content_vote_down.down_hate +
            c.content_vote_down.down_bad + c.content_vote_down.down_sad ,
            
            c_es : c.content_endorsement ,
            c_es_totle :
            c.content_endorsement.es_helpful + c.content_endorsement.es_truth +
            c.content_endorsement.es_happy + c.content_endorsement.es_positive
            
            
        }
        ';

        $s_info = new ArangoStatement($this->connection,[
            'query' => $q_info
        ]);

        /*
        $c_info = $s_info->execute();
        $g_info = $c_info->getMetadata();
        $t_info = $s_info->execute()->getMetadata()
        $getall = json_encode($g_info['result']);
        */
        $t_info = json_encode($s_info->execute()->getMetadata()['result']);
        //print_r($t_info);

        return $t_info;
    }

    public function GetDetailTopic($_key,$_user = 0)
    {
        $q_info = '
        FOR topic IN d_content
            FILTER topic._key == @keytopic && topic.content_type == "topic"
            
            LET topic_header = 
            (
                FOR v_topic_header , e_topic_header , p_topic_header IN 1..1 OUTBOUND topic._id e_content
                    FILTER p_topic_header.edge[*].label ALL == "content_header"
                    LIMIT 1
                RETURN  
                {
                    topic_name : v_topic_header.content_topic_name
                }
            )
            
            LET topic_body = 
            (
                FOR v_topic_body , e_topic_body , p_topic_body IN 1..1 OUTBOUND topic._id e_content
                    FILTER p_topic_body.edge[*].label ALL == "content_article"
                    SORT v_topic_body.content_timeline DESC
                    LIMIT 1
                RETURN
                {
                    topic_article : v_topic_body.content_article
                }
            )
            
            LET topic_user =
            (
                FOR v_topic_user , e_topic_user , p_topic_user IN 1..1 INBOUND topic._id e_content
                    FILTER p_topic_user.edge[*].label ALL == "user_topic"
                RETURN
                {
                    topic_usertitle : v_topic_user.userdisply ,
                    topic_userid : v_topic_user._key
                }
            )
            
            LET topic_vote_up_total = 
            (
                return
                    topic.content_vote_up.up_like + 
                    topic.content_vote_up.up_love + 
                    topic.content_vote_up.up_good +
                    topic.content_vote_up.up_lol 
            )
            
            LET topic_vote_down_total = 
            (
                return 
                    topic.content_vote_down.down_dislike +
                    topic.content_vote_down.down_hate + 
                    topic.content_vote_down.down_bad + 
                    topic.content_vote_down.down_sad 
            )
            
            LET topic_endorsement_total = 
            (
                return 
                    topic.content_endorsement.es_helpful +
                    topic.content_endorsement.es_truth +
                    topic.content_endorsement.es_happy +
                    topic.content_endorsement.es_positive 
            )
            
            LET topic_chk_user_es = 
            (
                FOR v_topic_es , e_topic_es , p_topic_es IN 1..1 INBOUND topic._id e_content
                    FILTER p_topic_es.edge[*].label ALL == "user_endorsement" &&
                        v_topic_es._key == @userid
                RETURN 
                {
                    es_value : e_topic_es.label_value
                }
            )
            
            LET topic_chk_user_vote =
            (
                FOR v_topic_vote , e_topic_vote , p_topic_vote IN 1..1 INBOUND topic._id e_content
                    FILTER  p_topic_vote.edge[*].label ALL == "user_vote" &&
                            v_topic_vote._key == @userid
                RETURN
                {
                    vote_value : e_topic_vote.label_value
                }
            )

            LET reply = 
            (
                FOR v_reply , e_reply , p_reply IN 1..1 OUTBOUND topic._id e_content
                    FILTER p_reply.edge[*].label ALL == "content_reply"
                    SORT v_reply.content_create ASC
                    
                LET reply_body = 
                (
                    FOR v_reply_body , e_reply_body , p_reply_body IN 1..1 OUTBOUND v_reply._id e_content
                        FILTER p_reply_body.edge[*].label ALL == "content_article"
                        SORT v_reply_body.content_timeline DESC
                        LIMIT 1
                    RETURN
                    {
                        reply_article : v_reply_body.content_article
                    }
                )
                
                LET reply_user = 
                (
                    FOR v_reply_user , e_reply_user , p_reply_user IN 1..1 INBOUND v_reply._id e_content
                        FILTER p_reply_user.edge[*].label ALL == "user_reply"
                    RETURN
                    {
                        reply_usertitle : v_reply_user.userdisply ,
                        reply_userid : v_reply_user._key
                    }
                )
                    
                LET reply_vote_up_total = 
                (
                    return
                        v_reply.content_vote_up.up_like + 
                        v_reply.content_vote_up.up_love + 
                        v_reply.content_vote_up.up_good +
                        v_reply.content_vote_up.up_lol 
                )
                
                LET reply_vote_down_total = 
                (
                    return
                        v_reply.content_vote_down.down_dislike +
                        v_reply.content_vote_down.down_hate + 
                        v_reply.content_vote_down.down_bad + 
                        v_reply.content_vote_down.down_sad 
                )
                
                LET reply_endorsement_total =
                (
                    return 
                        v_reply.content_endorsement.es_helpful +
                        v_reply.content_endorsement.es_truth +
                        v_reply.content_endorsement.es_happy +
                        v_reply.content_endorsement.es_positive 
                        
                )
                
                LET reply_chk_user_es =
                (
                    FOR v_reply_es , e_reply_es , p_reply_es IN 1..1 INBOUND v_reply._id e_content
                        FILTER  p_reply_es.edge[*].label ALL == "user_endorsement" &&
                                v_reply_es._key == @userid
                    RETURN
                    {
                        es_value : e_reply_es.label_value
                    }
                )
                
                LET reply_chk_user_vote =
                (
                    FOR v_reply_vote , e_reply_vote , p_reply_vote IN 1..1 INBOUND v_reply._id e_content
                        FILTER  p_reply_vote.edge[*].label ALL == "user_vote" &&
                                v_reply_vote._key == @userid
                    RETURN
                    {
                        vote_value : e_reply_vote.label_value
                    }
                )
                
                
                LET subreply = 
                (
                    FOR v_subreply , e_subreply , p_subreply IN 1..1 OUTBOUND v_reply._id e_content
                        FILTER p_subreply.edge[*].label ALL == "content_subreply"
                        SORT v_subreply.content_create ASC
                        
                    LET subreply_user = 
                    (
                        FOR v_subreply_user , e_subreply_user , p_subreply_user IN 1..1 INBOUND v_subreply._id e_content
                            FILTER p_subreply_user.edge[*].label ALL == "user_subreply"
                        RETURN
                        {
                            subreply_usertitle : v_subreply_user.userdisply ,
                            subreply_userid : v_subreply_user._key
                        }
                    )
                        
                    LET subreply_body = 
                    (
                        FOR v_subreply_body , e_subreply_body , p_subreply_body IN 1..1 OUTBOUND v_subreply._id e_content
                            FILTER p_subreply_body.edge[*].label ALL == "content_article"
                            SORT v_subreply_body.content_timeline DESC
                            LIMIT 1
                        RETURN
                        {
                            subreply_article : v_subreply_body.content_article
                        }
                    )
                        
                    LET subreply_vote_up_total = 
                    (
                        return
                            v_subreply.content_vote_up.up_like + 
                            v_subreply.content_vote_up.up_love + 
                            v_subreply.content_vote_up.up_good +
                            v_subreply.content_vote_up.up_lol 
                    )
                    
                    LET subreply_vote_down_total = 
                    (
                        return
                            v_subreply.content_vote_down.down_dislike +
                            v_subreply.content_vote_down.down_hate + 
                            v_subreply.content_vote_down.down_bad + 
                            v_subreply.content_vote_down.down_sad 
                    )
                    
                    LET subreply_endorsement_total =
                    (
                        return 
                            v_subreply.content_endorsement.es_helpful +
                            v_subreply.content_endorsement.es_truth +
                            v_subreply.content_endorsement.es_happy +
                            v_subreply.content_endorsement.es_positive 
                            
                    )
                    
                    LET subreply_chk_user_es =
                    (
                        FOR v_subreply_es , e_subreply_es , p_subreply_es IN 1..1 INBOUND v_subreply._id e_content
                            FILTER  p_subreply_es.edge[*].label ALL == "user_endorsement" &&
                                    v_subreply_es._key == @userid
                        RETURN
                        {
                            es_value : e_subreply_es.label_value
                        }
                    )
                    
                    LET subreply_chk_user_vote =
                    (
                        FOR v_subreply_vote , e_subreply_vote , p_subreply_vote IN 1..1 INBOUND v_subreply._id e_content
                            FILTER  p_subreply_vote.edge[*].label ALL == "user_vote" &&
                                    v_subreply_vote._key == @userid
                        RETURN
                        {
                            vote_value : e_subreply_vote.label_value
                        }
                    )
                    
                    RETURN 
                    {
                        subreply_id : v_subreply._key,
                        subreply_article : subreply_body[0].subreply_article,
                        subreply_create : v_subreply.content_create ,
                        subreply_edit : v_subreply.content_edit ,
                        subreply_edit_count : v_subreply.content_edit_count,
                        subreply_by_usertitle : subreply_user[0].subreply_usertitle ,
                        subreply_by_userid : subreply_user[0].subreply_userid ,
                        subreply_vote_total : subreply_vote_up_total[0] - subreply_vote_down_total[0],
                        subreply_vote_up_total : subreply_vote_up_total[0] ,
                        subreply_vote_up : v_subreply.content_vote_up ,
                        subreply_vote_down_total : subreply_vote_down_total[0] ,
                        subreply_vote_down : v_subreply.content_vote_down ,
                        subreply_endorsement_total : subreply_endorsement_total[0],
                        subreply_endorsement : v_subreply.content_endorsement ,
                        subreply_es_userkey : IS_NULL(subreply_chk_user_es[0].es_value) ? "none" : subreply_chk_user_es[0].es_value,
                        subreply_vote_userkey : IS_NULL(subreply_chk_user_vote[0].vote_value) ? "none" : subreply_chk_user_vote[0].vote_value,
                        subreply_status : v_subreply.content_status
                        
                    }
                )
                
                RETURN
                {
                    reply_id : v_reply._key,
                    reply_article : reply_body[0].reply_article,
                    reply_create : v_reply.content_create ,
                    reply_edit : v_reply.content_edit ,
                    reply_edit_count : v_reply.content_edit_count,
                    reply_by_usertitle : reply_user[0].reply_usertitle ,
                    reply_by_userid : reply_user[0].reply_userid ,
                    reply_vote_total : reply_vote_up_total[0] - reply_vote_down_total[0],
                    reply_vote_up_total : reply_vote_up_total[0] ,
                    reply_vote_up : v_reply.content_vote_up ,
                    reply_vote_down_total : reply_vote_down_total[0] ,
                    reply_vote_down : v_reply.content_vote_down ,
                    reply_endorsement_total : reply_endorsement_total[0],
                    reply_endorsement : v_reply.content_endorsement ,
                    reply_status : v_reply.content_status ,
                    reply_es_userkey : IS_NULL(reply_chk_user_es[0].es_value) ? "none" : reply_chk_user_es[0].es_value ,
                    reply_vote_userkey : IS_NULL(reply_chk_user_vote[0].vote_value) ? "none" : reply_chk_user_vote[0].vote_value,
                    subreply : subreply
                    
                }
            )

        return 
        {
            topic_id : topic._key ,
            topic_name : topic_header[0].topic_name ,
            topic_article : topic_body[0].topic_article ,
            topic_by_usertitle : topic_user[0].topic_usertitle ,
            topic_by_userid : topic_user[0].topic_userid ,
            topic_create : topic.content_create ,
            topic_edit : topic.content_edit ,
            topic_edit_count : topic.content_edit_count ,
            topic_vote_total : topic_vote_up_total[0] - topic_vote_down_total[0] ,
            topic_vote_up_total : topic_vote_up_total[0] ,
            topic_vote_up : topic.content_vote_up , 
            topic_vote_down_total : topic_vote_down_total[0] ,
            topic_vote_down : topic.content_vote_down ,
            topic_endorsement_total : topic_endorsement_total[0] ,
            topic_endorsement : topic.content_endorsement ,
            topic_es_userkey : IS_NULL(topic_chk_user_es[0].es_value) ? "none" : topic_chk_user_es[0].es_value,
            topic_vote_userkey : IS_NULL(topic_chk_user_vote[0].vote_value) ? "none" : topic_chk_user_vote[0].vote_value,
            topic_status : topic.content_status ,
            reply : reply
            
        }
        ';

        $s_info = new ArangoStatement($this->connection,[
            'query' => $q_info,
            'bindVars' => 
                [
                    'keytopic' => (string)$_key ,
                    'userid' => (string)$_user
                ]
        ]);

        /*
        $c_info = $s_info->execute();
        $g_info = $c_info->getMetadata();
        $t_info = $s_info->execute()->getMetadata()
        $getall = json_encode($g_info['result']);
        */

        $t_info = json_encode($s_info->execute()->getMetadata()['result']);
        //print_r($t_info);

        return $t_info;
    }

    public function NewReply($_topicid,$_content,$_user)
    {
        $datetime = strtotime(now());

        $docHandler = new ArangoDocumentHandler($this->connection);
        $edgeHandler = new ArangoEdgeHandler($this->connection);

        $userResult = $docHandler->get('d_user','d_user/'.$_user);
        $userId = $userResult->getId();

        $topicResult = $docHandler->get('d_content','d_content/'.$_topicid);
        $topicId = $topicResult->getId();

        // Start ---- d_content
        $dContentReply = new ArangoDocument();
        $dContentReply->content_create = (int) $datetime;
        $dContentReply->content_edit = (int) $datetime;
        $dContentReply->content_edit_count = (int) 0;

        $dContentReply->content_vote_up = array(
            'up_like' => (int) 0,
            'up_love' => (int) 0,
            'up_good' => (int) 0,
            'up_lol' => (int) 0
        );

        $dContentReply->content_vote_down = array(
            'down_dislike' => (int) 0,
            'down_hate' => (int) 0,
            'down_bad' => (int) 0,
            'down_sad' => (int) 0
        );
        
        $dContentReply->content_endorsement = array(
            'es_helpful' => (int) 0,
            'es_truth' => (int) 0,
            'es_happy' => (int) 0,
            'es_positive' => (int) 0
        );

        $dContentReply->content_status = array(
            'status_lock' => (int)0, 
            'status_hide' => (int)0, 
            'status_pin' => (int)0
        );

        $dContentReply->content_type = (string)"reply";

        $dContentReplyId = $docHandler->save('d_content',$dContentReply);
        // End ---- d_content

        // Start ---- d_content_article
        $dContentArticle = new ArangoDocument();
        $dContentArticle->content_article = $_content;
        $dContentArticle->content_timeline = $datetime;

        $dContentArticleId = $docHandler->save('d_content_article',$dContentArticle);
        // End ---- d_content_article

        $eContentAritcel = new ArangoEdge();
        $eContentAritcel->label = "content_article";
        $edgeHandler->saveEdge('e_content',  $dContentReplyId, $dContentArticleId  ,$eContentAritcel);

        $eContentUser = new ArangoEdge();
        $eContentUser->label = "user_reply";
        $edgeHandler->saveEdge('e_content',  $userId, $dContentReplyId  ,$eContentUser);

        $eContentTopic = new ArangoEdge();
        $eContentTopic->label = "content_reply";
        $edgeHandler->saveEdge('e_content',  $topicId, $dContentReplyId  ,$eContentTopic);
    }

    public function NewSubReply($_replyid,$_content,$_user)
    {
        $datetime = strtotime(now());

        $docHandler = new ArangoDocumentHandler($this->connection);
        $edgeHandler = new ArangoEdgeHandler($this->connection);

        $userResult = $docHandler->get('d_user','d_user/'.$_user);
        $userId = $userResult->getId();

        $replyResult = $docHandler->get('d_content','d_content/'.$_replyid);
        $replyId = $replyResult->getId();

        // Start ---- d_content
        $dContentSubReply = new ArangoDocument();
        $dContentSubReply->content_create = (int) $datetime;
        $dContentSubReply->content_edit = (int) $datetime;
        $dContentSubReply->content_edit_count = (int) 0;

        $dContentSubReply->content_vote_up = array(
            'up_like' => (int) 0,
            'up_love' => (int) 0,
            'up_good' => (int) 0,
            'up_lol' => (int) 0
        );

        $dContentSubReply->content_vote_down = array(
            'down_dislike' => (int) 0,
            'down_hate' => (int) 0,
            'down_bad' => (int) 0,
            'down_sad' => (int) 0
        );
        
        $dContentSubReply->content_endorsement = array(
            'es_helpful' => (int) 0,
            'es_truth' => (int) 0,
            'es_happy' => (int) 0,
            'es_positive' => (int) 0
        );

        $dContentSubReply->content_status = array(
            'status_lock' => (int)0, 
            'status_hide' => (int)0, 
            'status_pin' => (int)0
        );

        $dContentSubReply->content_type = (string)"subreply";

        $dContentSubReplyId = $docHandler->save('d_content',$dContentSubReply);

        // Start ---- d_content_article
        $dContentArticle = new ArangoDocument();
        $dContentArticle->content_article = $_content;
        $dContentArticle->content_timeline = $datetime;

        $dContentArticleId = $docHandler->save('d_content_article',$dContentArticle);
        // End ---- d_content_article

        $eContentAritcel = new ArangoEdge();
        $eContentAritcel->label = "content_article";
        $edgeHandler->saveEdge('e_content',  $dContentSubReplyId, $dContentArticleId  ,$eContentAritcel);

        $eContentUser = new ArangoEdge();
        $eContentUser->label = "user_subreply";
        $edgeHandler->saveEdge('e_content',  $userId, $dContentSubReplyId  ,$eContentUser);

        $eContentSubReply = new ArangoEdge();
        $eContentSubReply->label = "content_subreply";
        $edgeHandler->saveEdge('e_content',  $replyId, $dContentSubReplyId  ,$eContentSubReply);
    }

    public function SetVoteContent($_contentid , $_setvote , $_userid)
    {
        $newEdge= $this->TypeVote($_setvote);

        if($newEdge['label'] != "")
        {
            $docHandler = new ArangoDocumentHandler($this->connection);

            $userResult = $docHandler->get('d_user','d_user/'.$_userid);
            $userId = $userResult->getId();

            $contentResult = $docHandler->get('d_content','d_content/'.$_contentid);
            $contentId = $contentResult->getId();

            $_get_edge = '
                FOR c IN e_content
                    FILTER c._from == @userid 
                        && c._to == @contentid
                        && c.label == "user_vote"
                RETURN c.label_value
            ';

            $get_edge = new ArangoStatement($this->connection,[
                'query' => $_get_edge,
                'bindVars' => 
                    [
                        'contentid' => (string)$contentId ,
                        'userid' => (string)$userId 
                    ]
            ]);

            $get_edge_info = $get_edge->execute();
            $getCountInfo = $get_edge_info->getCount();
            
            if($getCountInfo > 0)
            {
                // Get Edge label_value
                $getEdgeType = $get_edge_info->getMetadata()['result'];

                //Check Edge Define
                $oldEdge = $this->TypeVote($getEdgeType[0]);

                if($oldEdge['label_value'] != $newEdge['label_value'])
                {
                    // Update Edge
                    $_update_edge = '
                        FOR c IN e_content
                            FILTER c._from == @userid 
                                && c._to == @contentid
                                && c.label == "user_vote"
                        UPDATE c._key WITH { label_value : @setvote } IN e_content
                        RETURN NEW
                    ';

                    $update_edge = new ArangoStatement($this->connection,[
                        'query' => $_update_edge,
                        'bindVars' => 
                            [
                                'contentid' => (string)$contentId ,
                                'userid' => (string)$userId ,
                                'setvote' => (string)$newEdge['value'] ,
                            ]
                    ]);
                    $update_edge->execute();

                    // Remove Old-Score
                    $_remove_score = '
                    FOR topic IN d_content
                        FILTER topic._id == @contentid
                        UPDATE topic WITH { ' . $oldEdge['label'] . ' :  { ' . $oldEdge['value'] . ' : topic.' . $oldEdge['label_value'] . ' - 1 } } IN d_content
                        RETURN NEW
                    ';

                    $remove_score = new ArangoStatement($this->connection,[
                        'query' => $_remove_score,
                        'bindVars' => 
                            [
                                'contentid' => (string)$contentId 
                            ]
                    ]);

                    $remove_score->execute();

                    // Add New-Score
                    $_add_score = '
                    FOR topic IN d_content
                        FILTER topic._id == @contentid
                        UPDATE topic WITH { ' . $newEdge['label'] . ' : {   ' . $newEdge['value'] . ' : topic.' . $newEdge['label_value'] . ' + 1 } } IN d_content
                        RETURN NEW
                    ';
                    $add_score = new ArangoStatement($this->connection,[
                        'query' => $_add_score,
                        'bindVars' => 
                            [
                                'contentid' => (string)$contentId 
                            ]
                    ]);

                    $add_score->execute();
                    
                    return 1;
                }
                else
                {
                    return 2;
                }
                
            }
            else
            {
                $_insert_edge = '
                    INSERT
                    {
                        _from : @userid ,
                        _to : @contentid ,
                        label : "user_vote" ,
                        label_value : @setvote
                    }
                    INTO e_content
                    RETURN NEW
                ';

                $insert_edge = new ArangoStatement($this->connection,[
                    'query' => $_insert_edge,
                    'bindVars' => 
                        [
                            'contentid' => (string)$contentId ,
                            'userid' => (string)$userId ,
                            'setvote' => (string)$newEdge['value'] ,
                        ]
                ]);

                $insert_edge->execute();
                
                // Add New-Score
                $_add_score = '
                FOR topic IN d_content
                    FILTER topic._id == @contentid
                    UPDATE topic._key WITH { ' . $newEdge['label'] . ' : {' . $newEdge['value'] . ' : topic.' . $newEdge['label_value']  . ' + 1 }} IN d_content
                    RETURN NEW
                ';

                $add_score = new ArangoStatement($this->connection,[
                    'query' => $_add_score,
                    'bindVars' => 
                        [
                            'contentid' => (string)$contentId 
                        ]
                ]);

                $add_score->execute();

                return 1;
            }
        }

        
    }

    public function GetVoteContent($_contentid , $_userid)
    {
        $docHandler = new ArangoDocumentHandler($this->connection);

        $contentResult = $docHandler->get('d_content','d_content/'.$_contentid);
        $contentId = $contentResult->getId();

        $userResult = $docHandler->get('d_user','d_user/'.$_userid);
        $userId = $userResult->getId();
        
        $_getvote = '
        FOR c IN d_content
            FILTER c._id == @contentid
            
            LET vote_up_total = 
            (
                return
                    c.content_vote_up.up_like + 
                    c.content_vote_up.up_love + 
                    c.content_vote_up.up_good +
                    c.content_vote_up.up_lol 
            )
            
            LET vote_down_total = 
            (
                return 
                    c.content_vote_down.down_dislike +
                    c.content_vote_down.down_hate + 
                    c.content_vote_down.down_bad + 
                    c.content_vote_down.down_sad 
            )

            LET content_chk_user_vote =
            (
                FOR v_content_vote , e_content_vote , p_content_vote IN 1..1 INBOUND c._id e_content
                    FILTER  p_content_vote.edge[*].label ALL == "user_vote" &&
                            v_content_vote._id == @userid
                RETURN
                {
                    vote_value : e_content_vote.label_value
                }
            )
            
        
        return 
        {
            vote_total : vote_up_total[0] - vote_down_total[0] ,
            vote_up_total : vote_up_total[0] ,
            vote_up : c.content_vote_up , 
            vote_down_total : vote_down_total[0] ,
            vote_down : c.content_vote_down ,
            vote_userkey : IS_NULL(content_chk_user_vote[0].vote_value) ? "none" : content_chk_user_vote[0].vote_value
            
        }
        ';

        $getvote = new ArangoStatement($this->connection,[
            'query' => $_getvote,
            'bindVars' => 
                [
                    'userid' => (string)$userId ,
                    'contentid' => (string)$contentId ,
                ]
        ]);
        $getvote_info = $getvote->execute();
        $_voteinfo = $getvote_info->getMetadata()['result'];
        $voteinfo = $_voteinfo[0];
        
        return $voteinfo;
    }

    public function SetESContent($_contentid , $_setes , $_userid)
    {
        $docHandler = new ArangoDocumentHandler($this->connection);
        $edgeHandler = new ArangoEdgeHandler($this->connection);

        $userResult = $docHandler->get('d_user','d_user/'.$_userid);
        $userId = $userResult->getId();

        $contentResult = $docHandler->get('d_content','d_content/'.$_contentid);
        $contentId = $contentResult->getId();

        $setes = $this->TypeVoteES($_setes);

        if($setes != "error")
        {
            $_chk_user = '
                FOR t in d_content
                    FILTER t._id == @contentid
                
                FOR vc_user , ec_user , pc_user IN 1..1 INBOUND t._id e_content
                    FILTER  pc_user.edges[*].label ALL == "user_topic" ||
                            pc_user.edges[*].label ALL == "user_reply" ||
                            pc_user.edges[*].label ALL == "user_subreply"

                RETURN  vc_user._id
            ';

            $chk_user = new ArangoStatement($this->connection,[
                'query' => $_chk_user,
                'bindVars' => 
                    [
                        'contentid' => (string)$contentId ,
                    ]
            ]);

            $_getUser = $chk_user->execute();
            $getUser = $_getUser->getMetadata()['result'];

            
            
            if($getUser[0] != $userId)
            {
                $_chk_useres = '
                    FOR t in d_content
                        FILTER t._id == @contentid
                    
                    FOR vc_user , ec_user , pc_user IN 1..1 INBOUND t._id e_content
                        FILTER  pc_user.edges[*].label ALL == "user_endorsement" &&
                                vc_user._id == @userid

                    RETURN  vc_user._id
                ';

                $chk_useres = new ArangoStatement($this->connection,[
                    'query' => $_chk_useres,
                    'bindVars' => 
                        [
                            'contentid' => (string)$contentId ,
                            'userid' => (string)$userId ,
                        ]
                ]);

                $_getUserSE = $chk_useres->execute();
                $getUserSECount = $_getUserSE->getCount();

                if($getUserSECount == 0)
                {

                    $_insert_es = '
                        INSERT
                        {
                            _from : @userid ,
                            _to : @contentid ,
                            label : "user_endorsement",
                            label_value : @label_value
                        }
                        INTO e_content
                    ';

                    $insert_es = new ArangoStatement($this->connection,[
                        'query' => $_insert_es,
                        'bindVars' => 
                            [
                                'contentid' => (string)$contentId ,
                                'userid' => (string)$userId ,
                                'label_value' => (string)$setes ,
                            ]
                    ]);

                    $insert_es->execute();

                    $_update_es = '
                        FOR c in d_content
                            FILTER c._id == @contentid
                        UPDATE c._key WITH { content_endorsement : { ' . $setes . ' : c.content_endorsement.' . $setes . ' + 1  }} IN d_content
                        RETURN NEW
                    ';

                    $update_es = new ArangoStatement($this->connection,[
                        'query' => $_update_es,
                        'bindVars' => 
                            [
                                'contentid' => (string)$contentId
                            ]
                    ]);

                    $update_es->execute();

                    return 1;
                }
                else
                {
                    return -1;
                }
            }
            else
            {
                return -2;
            }
        }
        else
        {
            return -3;
        }
    }

    public function GetESContent($_contentid , $_userid)
    {
        $docHandler = new ArangoDocumentHandler($this->connection);
        $edgeHandler = new ArangoEdgeHandler($this->connection);

        $userResult = $docHandler->get('d_user','d_user/'.$_userid);
        $userId = $userResult->getId();

        $contentResult = $docHandler->get('d_content','d_content/'.$_contentid);
        $contentId = $contentResult->getId();

        $_chk_useres = '
            FOR t in d_content
                FILTER t._id == @contentid
                    
                FOR vc_user , ec_user , pc_user IN 1..1 INBOUND t._id e_content
                    FILTER  pc_user.edges[*].label ALL == "user_endorsement" &&
                            vc_user._id == @userid

            RETURN  
            {
                label_value : IS_NULL(ec_user.label_value) ? "none" : ec_user.label_value ,
                es_content : t.content_endorsement ,
                es_total :  t.content_endorsement.es_helpful + t.content_endorsement.es_truth +
                                    t.content_endorsement.es_happy + t.content_endorsement.es_positive
            }
            
        ';

        $chk_useres = new ArangoStatement($this->connection,[
            'query' => $_chk_useres,
            'bindVars' => 
                [
                    'contentid' => (string)$contentId ,
                    'userid' => (string)$userId
                ]
        ]);

        $ex_getUser = $chk_useres->execute();
        $_getUser = $ex_getUser->getMetadata()['result'];
        $getUser = $_getUser[0];
        return $getUser;
    }

    public function TypeVote($_setvote)
    {
        if($_setvote == "up_like")
        {
            $settype['label'] = "content_vote_up";
            $settype['value'] = "up_like";
            $settype['label_value'] = "content_vote_up.up_like";
        }
        else if($_setvote == "up_love")
        {
            $settype['label'] = "content_vote_up";
            $settype['value'] = "up_love";
            $settype['label_value'] = "content_vote_up.up_love";
        }
        else if($_setvote == "up_good")
        {
            $settype['label'] = "content_vote_up";
            $settype['value'] = "up_good";
            $settype['label_value'] = "content_vote_up.up_good";
        }
        else if($_setvote == "up_lol")
        {
            $settype['label'] = "content_vote_up";
            $settype['value'] = "up_lol";
            $settype['label_value'] = "content_vote_up.up_lol";
        }
        else if($_setvote == "down_dislike")
        {
            $settype['label'] = "content_vote_down";
            $settype['value'] = "down_dislike";
            $settype['label_value'] = "content_vote_down.down_dislike";
        }
        else if($_setvote == "down_hate")
        {
            $settype['label'] = "content_vote_down";
            $settype['value'] = "down_hate";
            $settype['label_value'] = "content_vote_down.down_hate";
        }
        else if($_setvote == "down_bad")
        {
            $settype['label'] = "content_vote_down";
            $settype['value'] = "down_bad";
            $settype['label_value'] = "content_vote_down.down_bad";
        }
        else if($_setvote == "down_sad")
        {
            $settype['label'] = "content_vote_down";
            $settype['value'] = "down_sad";
            $settype['label_value'] = "content_vote_down.down_sad";
        }
        else
        {
            $settype['label'] = "";
            $settype['value'] = "";
            $settype['label_value'] = "";
        }

        return $settype;
    }

    public function TypeVoteES($_setes)
    {
        $setes = "";
        if($_setes == "es_helpful")
        {
            $setes = "es_helpful";
        }
        else if($_setes == "es_truth")
        {
            $setes = "es_truth";
        }
        else if($_setes == "es_happy")
        {
            $setes = "es_happy";
        }
        else if($_setes == "es_positive")
        {
            $setes = "es_positive";
        }
        else
        {
            $setes = "error";
        }

        return $setes;
    }
    
}