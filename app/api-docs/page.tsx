import { spec } from '@/lib/swagger';
import SwaggerUI from './SwaggerUI';

export default function ApiDocsPage() {
    return (
        <div className="bg-white min-h-screen">
            <SwaggerUI spec={spec} />
        </div>
    );
}
