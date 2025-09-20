import React, { useState } from "react";
import  CreateJobModal from "../CreateJob/CreateJobModal.tsx"; // your modal component

export default function ModalPlayground() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <CreateJobModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data:any) => {
          console.log("Submitted data:", data);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
