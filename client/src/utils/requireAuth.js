import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addFlashMessage} from "../store/actions/flash";

export default function (ComposedComponent) {
    class Authenticate extends Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to login to access this page'
                });
                this.props.history.push('login');
            }
        }
        componentWillUpdate(nextProps){
            if(nextProps.isAuthenticated === false){
                this.props.history.push('login');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}