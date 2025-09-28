type Props = {
  title: string;
  status: string;
  onClick?: () => void;
};

export default function ProjectCard({ title, status, onClick }: Props) {
  return (
    <button className="w-full text-left border rounded p-4 hover:bg-gray-50" onClick={onClick}>
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-600">{status}</div>
    </button>
  );
}
