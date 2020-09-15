@extends('_layout')
@section('title',  $title )
@section('content')
<tag_topic topicid="{{ $topickey }}"></tag_topic>
@endsection