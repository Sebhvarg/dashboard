import Logo from '../assets/img/logo.png';
interface Description{
    name: string;
    min: number;
    max: number;
}

export default function Header(config: Description) {
   
    return (
        <div>
           <div>
                <img src={Logo} style={{
                    width: '130px',
                    height: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'bottom',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                    padding: '10px',
                }} />
                </div>
                 <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
                <h2 style={{color: 'black', fontFamily: 'Helvetica', fontSize: '20px', fontWeight: 'Bold'}}>Clima en {config.name} | min. {config.min} , max. {config.max} </h2>
            </div>
        </div>
    )
}