import { ServicesProps } from "./SetupDate"
import { ActualDate } from '../../context/UserContext';

interface Props extends ServicesProps {
    dates: ActualDate[]
}

export const ViewDates = ( { services, setOpen, dates }: Props ) => {

    const makeDate = ( { place, date, confirmed }: ActualDate, key: number ) => {
        const actualDate = new Date( date );
        return (
            <div key = { key }>
                <span>
                    { confirmed ? 'Confirmado' : 'Por confirmar' }
                </span>
                <span>
                    Lugar: { place }
                </span>
                <span>
                    fecha: {
                        `${ actualDate.getMonth() }/${ actualDate.getDay() }/${ actualDate.getHours() }:${ actualDate.getMinutes() }` 
                    }
                </span>
            </div>
        )
    }

    return (
        <div className = "servicesContainer">
            <div
                className = "servicesTitle"
                onClick = { () => setOpen('viewDates') }
            >
                <span>Ver citas</span>
            </div>
            {
                services.open && services.name === 'viewDates' && (
                    <div className = "servicesContent">
                        <div className = "servicesSection viewDates">
                            {
                                dates.map(( date, key ) => {
                                    return makeDate( date, key )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
