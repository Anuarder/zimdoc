export function EmptyDocs({ className = '' }: { className?: string }) {
  return (
    <div className={`prose max-w-full text-center text-gray-700 ${className}`}>
      <h3>Документов нет</h3>
      <p>Чтобы начать, выберите пустой документ или один из шаблонов выше</p>
    </div>
  );
}
