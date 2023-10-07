const currentYear = new Date().toISOString().substr(0,4)

export default function Footer() {
    return(
        <footer> <small>&copy; Copyright {currentYear}, FixMes Haven</small> </footer> 
    )
}