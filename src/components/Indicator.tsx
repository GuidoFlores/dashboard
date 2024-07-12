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
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {config.title} 
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
            {config.subtitle}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
            {config.value.toString()}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
            {config.value2.toString()}
        </Typography>
    </Paper> 
    )
}