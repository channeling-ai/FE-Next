import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default function PrivacyPage() {
    const filePath = path.join(process.cwd(), 'content/privacy.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    return (
        <div className="prose mx-auto py-10">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
