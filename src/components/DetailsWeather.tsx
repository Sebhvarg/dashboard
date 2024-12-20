import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function DetailsWeather(config: Indicator) {
    interface Indicator {
        title?: String;
        image?: String;
        value?: String;
    }

    return (
        <>
          <Paper
             sx={{
               p: 2,
               display: 'flex',
               flexDirection: 'column',
               borderRadius: '25px',
               boxShadow: '3px 5px 0px 0px rgba(0, 0, 0, 0.07)',
               margin: '10px',
             }}
           >
             <Typography component="h2" variant="h6" 
                         color="black" sx={{fontFamily:'Helvetica', fontSize:'16px', fontWeight:'Bold', flex: 1}}  gutterBottom>
                 {config.title} 
             </Typography>
             <img src={config.image} style={{
                width: '100%',
                height: '50px',
                objectFit: 'contain',
                objectPosition: 'bottom',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
             }}/>
             <Typography color="black"  sx={{fontFamily:'Helvetica', fontSize:'20px', fontWeight:'Bold', flex: 1, textAlign: 'center', marginTop: '5px'}}>
                 {config.value}
             </Typography>
         </Paper> 
        </>
    );

}