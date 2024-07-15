import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Config {
    title?: String;
    subtitle?: String;
    value?: String;
    value2?: String
}

export default function Indicator(config: Config) {
    return (
        <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h2" variant="h6" color="primary" 
        sx={{ color: 'blue', backgroundColor: '#a1d9e2', p: 1, borderRadius: 1 }}>
            {config.title} 
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 , color: '#000000', backgroundColor: '#f8f7f8', p: 1, borderRadius: 1  }}>
            {config.subtitle}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1, color: '#000000', backgroundColor: '#f8f7f8', p: 1, borderRadius: 1}}>
            {config.value.toString()}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1, color: '#000000', backgroundColor: '#f8f7f8', p: 1, borderRadius: 1}}>
            {config.value2.toString()}
        </Typography>
    </Paper> 
    )
}