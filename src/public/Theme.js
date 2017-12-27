import { createMuiTheme } from 'material-ui/styles';
import {blue,grey} from 'material-ui/colors';
const theme = createMuiTheme({
  palette: {
	type: 'light',
    primary: {...grey,"500":grey[900]},
  },

  typography: {
    htmlFontSize: 18,
  },
  overrides: {
  	MuiPaper:{
  		root:{
  			
  		}
  	}
  },
});
export default theme
