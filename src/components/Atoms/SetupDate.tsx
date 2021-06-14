import { UseForm } from "../../hooks/UseForm"

interface Services {
    open: boolean,
    name: string
}

interface Formulary {
    place: string
}

export interface ServicesProps {
    services: Services,
    setOpen: ( name:string ) => void,
    handlePost?: ( route: string, info: Formulary ) => void
}

export const SetUpDate = ( { services, setOpen, handlePost }: ServicesProps ) => {

    const { place, onChange } = UseForm <Formulary> ({
        place: ''
    });

    const handleClick = () => {
        handlePost && handlePost('date', { place });
    }

    return (
        <div className = "servicesContainer">
            <div
                className = "servicesTitle"
                onClick = { () => setOpen('setupDate') }
            >
                <span>Agendar cita</span>
            </div>
            {
                services.open && services.name === 'setupDate' && (
                    <div className = "servicesContent">
                        <div className = "servicesSection">
                            <label>Lugar</label>
                            <input 
                                type = "text"
                                value = { place }
                                onChange = {
                                    ({ target }) => onChange ( 
                                        target.value,
                                        'place'
                                    )
                                }
                            />
                        </div>
                        <div
                            className = "servicesBtn"
                            onClick = { handleClick }
                        >
                            <span>Enviar</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
