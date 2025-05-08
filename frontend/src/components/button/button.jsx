//Komponenta za button da nam svi buttoni budu isti
//importate-  import Button from '../../components/button/button';
// koristite  <Button onClick=......}>Dugme</Button>


export default function Button({ children, onClick, type = "button" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="group relative inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#274d60] text-white font-semibold transition-all duration-300 
         hover:bg-[#0c969c] focus:outline-none overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></span>
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
  
  