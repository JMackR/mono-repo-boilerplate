import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        basicInfo: {
            fontWeight: "bold",
            fontSize: 20,
            lineHeight: 2,
            color: "#000000",
            marginBottom: theme.spacing(2)
        },
        marginTop: {
            marginTop: theme.spacing(4)
        },
        button: {
            marginRight: theme.spacing(4)
        },
        link: {
            color: "#100D23",
            fontWeight: 200,
            textDecoration: "underline",
            backgroundColor: "transparent"
        },
    })
)
