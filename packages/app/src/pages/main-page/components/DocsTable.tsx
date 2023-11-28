import { useNavigate } from 'react-router-dom';
import type { DocumentType } from '~/entities/document';

export function DocsTable({ docs }: { docs: Array<DocumentType> }) {
  const navigate = useNavigate();

  return (
    <table className="w-full table-fixed">
      <thead className="sticky top-0 bg-white">
        <tr>
          <td className="w-10 px-2 py-5 text-center font-semibold">#</td>
          <td className="px-2 py-5 font-semibold">Название</td>
          <td className="w-60 px-2 py-5 font-semibold">Владелец</td>
        </tr>
      </thead>
      <tbody>
        {docs.map((doc, i) => (
          <tr
            key={`doc_${i}`}
            className="cursor-pointer duration-100 hover:bg-zim-secondary-dark hover:text-white"
            onClick={() => navigate(`/document/${doc.id}`)}
          >
            <td className="w-10 rounded-l px-3 py-2 text-center">{i + 1}</td>
            <td className="px-3 py-2">
              <div className="flex items-center space-x-5">
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                  <path
                    d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                </svg>
                <span>{doc.title}</span>
              </div>
            </td>
            <td className="w-60 px-3 py-2">{doc.author_username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
