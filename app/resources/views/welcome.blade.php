<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
        <script defer src="https://use.fontawesome.com/releases/v5.1.0/js/all.js"></script>
        <title>Laravel</title>
    </head>
    <body>
        <div id="app">
            <header>
                <div class="container is-widescreen">
                    <menumain></menumain>
                </div>
            </header>
            <section>
                <div class="container is-widescreen">
                    <welcome></welcome>
                </div>
            </section>
            <footer>
                <div class="container is-widescreen">
                   <footermain></footermain>
                </div>
            </footer>
        </div>
    </body>
    <script type="text/javascript" src="{{ mix('/js/app.js') }}"></script>
    <script type="text/javascript" src="{{ mix('/css/app.css') }}"></script>
</html>
