interface ModalProps {
  open: boolean; // ✅ open 추가
  onClose: () => void; // ✅ onClose 추가
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null; // ✅ 모달이 닫혀있으면 렌더링 안 함

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2">
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
