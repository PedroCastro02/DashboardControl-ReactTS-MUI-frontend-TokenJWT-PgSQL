
export interface Data {
    id: number;
    person: { name: string, telephone: number};
    name: string;
    position: string;
    dt_hiring: string; // ou o tipo de data apropriado
    balance_of_hours: number; // ou o tipo apropriado
    real_wage: number;
    fiscal_wage: number;
}
export interface DataPeople {
    id: number;
    name: string;
}
export interface DataPeople2 {
    value: number;
    label: string;
}

export interface DataTurno {
    id: number;
    shift: string;
}

export interface ModalAdicionarProps {
    open: boolean;
    handleClose: () => void;
}

export interface TiposVisu {
    isOpen: () => boolean;
    setOpen: (isOpen: boolean) => void;
    id: number;
    funcionarios: any;
    // employeeId: number;
    // EmployeeNome: string;
    // dtHiring: any;
    // position: string;
}
    
    
