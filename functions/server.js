// Cloudflare Pages Function to handle server-side redirect
// This provides a more reliable fallback mechanism

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const serverId = url.searchParams.get('id');

  if (!serverId) {
    return Response.redirect('https://www.lunarclient.com/download', 302);
  }

  const serverAddress = `server-${serverId}.plexverse.net`;
  const lunarClientUrl = `lunarclient://play?serverAddress=${serverAddress}`;

  // Return HTML that attempts to open Lunar Client and falls back to download page
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joining Server...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <p>Opening Lunar Client...</p>
    </div>

    <script>
        (function() {
            const lunarClientUrl = ${JSON.stringify(lunarClientUrl)};
            
            // Try to open Lunar Client
            window.location.href = lunarClientUrl;

            // Fallback: If Lunar Client doesn't open, redirect to download page after a delay
            let fallbackTriggered = false;
            const fallbackTimeout = setTimeout(() => {
                if (!fallbackTriggered) {
                    fallbackTriggered = true;
                    window.location.href = 'https://www.lunarclient.com/download';
                }
            }, 2000);

            // If the page becomes visible again (user came back), they likely don't have Lunar Client
            window.addEventListener('focus', () => {
                if (!fallbackTriggered) {
                    clearTimeout(fallbackTimeout);
                    fallbackTriggered = true;
                    window.location.href = 'https://www.lunarclient.com/download';
                }
            }, { once: true });

            // Also check if we're still on the page after a longer delay
            setTimeout(() => {
                if (!fallbackTriggered && document.visibilityState === 'visible') {
                    clearTimeout(fallbackTimeout);
                    fallbackTriggered = true;
                    window.location.href = 'https://www.lunarclient.com/download';
                }
            }, 1500);
        })();
    </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}

