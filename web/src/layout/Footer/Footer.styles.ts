import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            paddingTop: theme.spacing(2)
        },
        footer: {
            padding: theme.spacing(8, 18, 10, 18),
            [theme.breakpoints.down('md')]: {
                padding: theme.spacing(8, 3, 6, 3),
            },
            marginTop: "auto",
            backgroundColor: "#100d23",
        },
        logo: {
            marginBottom: theme.spacing(2)
        },
        socialIcon: {
            marginRight: theme.spacing(2)
        },
        link: {
            marginRight: theme.spacing(1),
            color: "#b4c2cf",
            fontWeight: 200,
            textDecoration: "none",
            backgroundColor: "transparent",
            fontFamily: "Muli,Verdana,Geneva,Tahoma,sans-serif",
            fontSize: 16,
        },
        email: {
            fontWeight: 200,
            fontFamily: "Muli Regular,Verdana,Geneva,Tahoma,sans-serif",
            color: "#fff",
            fontSize: 15,
        },
        description: {
            marginBottom: theme.spacing(2),
            fontFamily: "Muli,Verdana,Geneva,Tahoma,sans-serif",
            fontStyle: "normal",
            lineHeight: 1.5,
            fontWeight: 300,
            fontSize: 14,
            color: "#b4c2cf",
        },
    })
)
