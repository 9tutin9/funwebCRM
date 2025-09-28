type Props = {
  title: string | null;
  description: string | null;
  created_at: string;
};

export default function FeedItem({ title, description, created_at }: Props) {
  return (
    <div className="border rounded p-4">
      <div className="flex items-center justify-between">
        <div className="font-medium">{title ?? 'Update'}</div>
        <time className="text-xs text-gray-500">{new Date(created_at).toLocaleString()}</time>
      </div>
      <div className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{description}</div>
    </div>
  );
}
