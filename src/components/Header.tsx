import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: '#ffffff',
          }}
        >
          <Toolbar
            sx={{
              boxShadow:
                '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.5px',
                color: 'primary.main',
                px: 5,
              }}
            >
              BARCODE<span style={{ color: '#444' }}>GENERATOR</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
