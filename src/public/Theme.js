import { createMuiTheme } from 'material-ui/styles';
import shadows from 'material-ui/styles/shadows';
import {blue,grey,pink,brown,red,indigo} from 'material-ui/colors';

//shadows[1]="0 2px 4px rgba(0,0,0,0.1)";

const theme = createMuiTheme({
  palette: {
	  type: 'light',
	  primary:indigo,
	  secondary:red
  },

  typography: {
    htmlFontSize: 18,
  },
  //shadows:shadows,
  overrides: {

  },

});


export default theme
