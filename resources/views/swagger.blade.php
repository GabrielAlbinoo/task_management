<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Documentação da API</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
    <style>body{margin:0} #swagger-ui{max-width:1200px;margin:0 auto}</style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        const spec = JSON.parse(@json($openapi));
        window.ui = SwaggerUIBundle({
          spec,
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis],
          layout: 'BaseLayout',
          docExpansion: 'none',
          defaultModelsExpandDepth: -1
        });
      };
    </script>
  </body>
  </html>
