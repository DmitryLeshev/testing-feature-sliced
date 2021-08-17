import { createStyles, makeStyles } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import { Block, NoEncryptionTwoTone } from "@material-ui/icons";
import clsx from "clsx";
import { NONAME } from "dns";

import { Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

type Props = {};

const ProfilePage = ({ }: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profile}>
        <section className={classes.container}>
          <Typography variant='h3' className={classes.heading}>Page Profile</Typography>

          <div className={classes.bloks}>

            <div className={classes.blok}>
              <h4 className={classes.blokText}>Theme</h4>
              <div className={classes.lighting}>
                <p className={classes.extraText}>light</p><Switch /><p className={classes.extraText}>dark</p>
              </div>
              <div className={classes.color}>
                <p className={classes.extraText}>Colors</p>
              </div>
              <button className={classes.button}>Save</button>
            </div>

            <div className={classes.blok}>
              <h4 className={classes.blokText}>Language</h4>
              <div className={classes.lanuageDiv}>
                <button className={classes.langbtn}>English</button>
                <button className={classes.langbtn}>Русский</button>
              </div>
            </div>

            <div className={classes.blok}>
              <h4 className={classes.blokText}>Else</h4>
              <div className={classes.elseDiv}>Something</div>
            </div>

          </div>
        </section>
      </div>
    </>
  )
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    profile: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",

      margin: '0 auto'
    },

    container: {
      width: 1200,
      height: 'auto',
      margin: 24,
      padding: 16,
      borderRadius: 16,

      // backgroundColor: '#21213A',

      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'centr',

      border: '5px solid #21213A',
    },

    heading: {
      width: 300,
      height: 60,
      marginBottom: 16,

      alignSelf: 'center',
    },

    bloks:{
      width: '100%',
      height: 'auto',

      margin: 0,
      boxSizing: "border-box",
      padding: 8,

      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "stretch",

      borderTop: '2px solid #14142A',
    },

    blok: {
      // width: '23%',
      // flexGrow: 1,

      boxSizing: "border-box",
      padding: 24,
      marginBottom: 8,
      borderRadius: 16,

      // backgroundColor: '#2c2c4b',
      backgroundColor: theme.palette.background.paper,

      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      // flexBasis: 'auto',
      // flexShrink: 1,
      // alignSelf: 'stretch',
    },

    Name: {
      width: '100%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      borderTop: '1px solid #14142A',
      borderBottom: '1px solid #14142A',
    },

    blokText: {
      fontSize: 24,

      margin: 0,
      marginBottom: 8,
    },

    lighting: {
      width: '100%',
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",

      borderTop: '1px solid #14142A',
    },

    extraText: {
      fontSize: 16,
      margin: '8px 0',
    },

    color: {
      width: '100%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      borderBottom: '1px solid #14142A',
    },

    lanuageDiv: {
      width: '100%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      boxSizing:'border-box',
      padding: '8px 0',
      
      borderTop: '1px solid #14142A',
      // borderBottom: '1px solid #14142A',
    },

    elseDiv: {
      width: '100%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      boxSizing:'border-box',
      padding: '8px 0',
      
      borderTop: '1px solid #14142A',
      // borderBottom: '1px solid #14142A',
    },

    button: {
      width: 120,
      height: 40,

      borderRadius: 40,
      border: '2px solid #1CC8EE',
      boxSizing: 'border-box',
      margin: 8,
      marginBottom: 0,
      padding: 5,

      color: '#1CC8EE',
      backgroundColor: 'rgba(0, 0, 0, 0)',

      fontSize: 14,
      fontWeight: 600,

      "&:hover": {
        backgroundColor: '#1CC8EE',
        color: 'white'
      }
    },

    langbtn: {
      width: '100%',
      height: 50,

      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: 'white',

      border: '2px solid #1CC8EE',
      borderRadius: 10,
      marginTop: 10,

      fontSize: 14,
      fontWeight: 600,

      "&:hover": {
        backgroundColor: '#1CC8EE',
        color: 'white'
      }
    },

    "@media all and (max-width: 1190px)": {
      container: {
        width: 800,
        height: 'auto',
      },

      bloks: {
        width: 'auto',
        height: 'auto',
        flexWrap: 'wrap',
        alignContent: 'flex-start',

        paddingLeft: 0,
      },

      blok: {
        // width: '48%',
        flexBasic: 'auto',

        marginBottom: 16,
        marginLeft: 8,
      },
    },

    "@media all and (max-width: 520px)": {
      container: {
        width: 'auto',
        height: 'auto',
      },

      bloks: {
        width: 'auto',
        height: 'auto',

        display: 'block',
        flexWrap: 'nowrap',
      },
      
      blok: {
        width: 'auto',
        marginBottom: '10px',
      },
    },
  })
);

export default ProfilePage;
