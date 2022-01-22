// import { makeStyles } from "@material-io/core/styles";
// // export these StylesContext we can call this as a function and inside
// // it requires one more call back function
// export default makeStyles((theme) => ({
//   // the call back function inside returns an object
//   // so we have to wrap it in parenthesis ({()})
// //   whatever styles you want to add you can add them in css in js type of way
//     // that means that if you want to have a className of title,
//     // you would create a title property thats going to be an object 
//     // then you can set the color to be 'red'
//     title: {
//         color: 'red'
//     }
//     // you can also pass in a theme object which allows you to
//     // use their colors and padding and everything else
// }));
import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
  },
  searchIcon: {
    padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('md')]: { width: '20ch' },
  },
  toolbar: {
    display: 'flex', justifyContent: 'space-between',
  },
}));