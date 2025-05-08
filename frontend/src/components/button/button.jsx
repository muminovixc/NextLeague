//Komponenta za button da nam svi buttoni budu isti
//importate-  import Button from '../../components/button/button';
// koristite  <Button onClick=......}>Dugme</Button>


export default function Button({ children, onClick, type = "button" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="bg-[#0c969c] hover:bg-[#0a7075] active:bg-[#032f30] text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-200"
      >
        {children}
      </button>
    );
  }
  