<?php

namespace Endnix\Http\Controllers\Post;

use Illuminate\Http\Request;

use Endnix\Http\Controllers\Controller;
use Endnix\Exmodel\Post\Posthandle;
use Endnix\External\Ex_security;


class Posttoppic extends Controller
{
    //
    public function __construct()
    {
        
    }

    public function newtopic_view(Request $request)
    {
        echo view('createpost');
    }

    public function newtopic_post(Request $request)
    {
        $topic_name = $request->input('topic_name');
        $topic_content = $request->input('topic_content');

        $class_security = new Ex_security();

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
            
            $class_post = new Posthandle();

            $class_post->NewTopic($topic_name , $topic_content , $userid);
            
            return response()->json([
                'status' => 1 , 
                'error' => 0
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 0 , 
                'error' => 1
            ]);
        }
    }

    public function alltopic_get(Request $request)
    {
        $class_post = new Posthandle();
        $_return = $class_post->GetTopicList();
        return $_return;
        //return response()->json($_return);
    }

    public function topic_get(Request $request , $keytopic)
    {
        //print_r($request->input('i'));
        /*
        $class_post = new Posthandle();
        echo "<pre>" . $keytopic;
        */
        $class_post = new Posthandle();
        $title_topic = $class_post->GetTopicTitle($keytopic);
        $title_topic = json_decode($title_topic);

        $dataPass = array(
            'topickey' => (string)$keytopic ,
            'title' => (string)$title_topic[0]->c_title ,
            'description' => (string)$title_topic[0]->c_article
        );
    
        echo view('topic' , $dataPass );
    }

    public function topic_api(Request $request)
    {
        $userid = 0;
        $topicId = $request->input('topicid');
        

        $class_security = new Ex_security();

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
        }

        $class_post = new Posthandle();
        $contentdetail = $class_post->GetDetailTopic($topicId,$userid);
        $contentdetail = json_decode($contentdetail);

        return $contentdetail;
    }

    public function reply_postapi(Request $request)
    {
        $class_security = new Ex_security();
        $reply_content = $request->input('creply');
        $topicid = $request->input('cid');

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
            
            $class_post = new Posthandle();

            $class_post->NewReply($topicid , $reply_content , $userid);
            
            return response()->json([
                'status' => 1 , 
                'error' => 0
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 0 , 
                'error' => 1
            ]);
        }
        
    }

    public function subreply_postapi(Request $request)
    {
        $reply_id = $request->input('reply_id');
        $subreply_content = $request->input('csreply');

        $class_security = new Ex_security();

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
            
            $class_post = new Posthandle();

            $class_post->NewSubReply($reply_id , $subreply_content , $userid);
            
            return response()->json([
                'status' => 1 , 
                'error' => 0
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 0 , 
                'error' => 1
            ]);
        }
    }

    public function setvote_api(Request $request)
    {
        $contentid = $request->input('contentid');
        $setvote = $request->input('setvote');

        $class_security = new Ex_security();

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
            
            $class_post = new Posthandle();

            $_value = $class_post->SetVoteContent($contentid , $setvote , $userid);

            $dataget = $class_post->GetVoteContent($contentid , $userid );
            
            return response()->json([
                'status' => $_value  , 
                'error' => 0 ,
                'voteup' => $dataget['vote_up'],
                'voteuptotal' => $dataget['vote_up_total'],
                'votedown' => $dataget['vote_down'],
                'votedowntotal' => $dataget['vote_down_total'] ,
                'voteuserkey' => $dataget['vote_userkey']
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 0 , 
                'error' => 1
            ]);
        }

        
    }

    public function getvote_api(Request $request)
    {
        $contentid = $request->input('contentid');
        $class_security = new Ex_security();

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
            
            $class_post = new Posthandle();

            $dataget = $class_post->GetVoteContent($contentid , $userid );

            return response()->json([
                'status' => 1 , 
                'error' => 0 ,
                'voteup' => $dataget['vote_up'],
                'voteuptotal' => $dataget['vote_up_total'],
                'votedown' => $dataget['vote_down'],
                'votedowntotal' => $dataget['vote_down_total'] ,
                'voteuserkey' => $dataget['vote_userkey']
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 0 , 
                'error' => 1
            ]);
        }
    }

    public function setendorsement_api(Request $request)
    {
        $contentid = $request->input('contentid');
        $p_setes = $request->input('setes');

        $class_security = new Ex_security();

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
            
            $class_post = new Posthandle();

            $_value = $class_post->SetESContent($contentid , $p_setes , $userid);
            
            return response()->json([
                'status' => $_value  , 
                'error' => 0 
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 0 , 
                'error' => 1
            ]);
        }
    }

    public function getendorsement_api(Request $request)
    {
        $contentid = $request->input('contentid');

        $class_security = new Ex_security();

        if($class_security->getCookie() != null)
        {
            $user = $class_security->getCookie();
            $userid = $user->userid;
            
            $class_post = new Posthandle();

            $_value = $class_post->GetESContent($contentid , $userid);
            
            return response()->json([
                'useresvote' => $_value['label_value'] ,
                'es_content' => $_value['es_content'] ,
                'es_total' => $_value['es_total'] ,
                'status' => 1 , 
                'error' => 0 
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 0 , 
                'error' => 1
            ]);
        }
    }
}
