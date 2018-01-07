import React,{Component} from 'react'
//import PropTypes from 'prop-types';
const initialRequest=(initialDispatchs,WrappedComponent)=>class extends Component{
	
	componentWillMount(){
		console.log(this.props.store)
	}
	render() {
	     console.log(this.state, 'state');
	     return <WrappedComponent {...this.props} />
	}
}
//contextTypes={ store: PropTypes.object.isRequired }
export default initialRequest