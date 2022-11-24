import * as vscode from "vscode";

const provider = (text: string) => {
  const contentProvider = new (class
    implements vscode.TextDocumentContentProvider
  {
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    provideTextDocumentContent(): string {
      return text;
    }
  })();
  return contentProvider;
};

export default provider;
