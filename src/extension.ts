import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const provider = new AvenxViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(AvenxViewProvider.viewType, provider)
	);
}

class AvenxViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'avenxExplorer';

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const logoUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'logo.svg'));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Avenx Overview</title>
				<style>
					body {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 20px;
						color: var(--vscode-foreground);
						font-family: var(--vscode-font-family);
					}
					img {
						max-width: 150px;
						height: auto;
						margin-bottom: 20px;
					}
					h1 {
						font-size: 1.2rem;
						margin: 0;
						text-align: center;
					}
				</style>
			</head>
			<body>
				<img src="${logoUri}" alt="Avenx Logo" />
				<h1>Avenx-JS Tooling</h1>
			</body>
			</html>`;
	}
}
