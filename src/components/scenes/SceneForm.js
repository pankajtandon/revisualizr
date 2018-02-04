import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { validateSceneFields, validateSceneFieldsSuccess, validateSceneFieldsFailure } from '../../actions/scenes';
import { createScene, createSceneSuccess, createSceneFailure } from '../../actions/scenes';

//Client side validation
function validate(values) {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Enter a Title';
    }
    if (!values.categories || values.categories.trim() === '') {
        errors.categories = 'Enter categories';
    }
    if (!values.content || values.content.trim() === '') {
        errors.content = 'Enter some content';
    }

    return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
    return dispatch(validateSceneFields(values))
        .then((result) => {
            //Note: Error's "data" is in result.payload.response.data
            // success's "data" is in result.payload.data
            if (!result.payload.response) { //1st onblur
                return;
            }

            let {data, status} = result.payload.response;
            //if status is not 200 or any one of the fields exist, then there is a field error
            if (response.payload.status != 200 || data.title || data.categories || data.description) {
                //let other components know of error by updating the redux` state
                dispatch(validateSceneFieldsFailure(data));
                throw data; //throw error
            } else {
                //let other components know that everything is fine by updating the redux` state
                dispatch(validateSceneFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
            }
        });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateScene = (values, dispatch) => {
    return dispatch(createScene(values, sessionStorage.getItem('jwtToken')))
        .then(result => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload.response && result.payload.response.status !== 200) {
                dispatch(createSceneFailure(result.payload.response.data));
                throw new SubmissionError(result.payload.response.data);
            }
            //let other components know that everything is fine by updating the redux` state
            dispatch(createSceneSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
        });
}

const renderField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label  className="control-label">{label}</label>
        <div>
            <input {...input} className="form-control"  placeholder={label} type={type}/>
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

const renderTextArea = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label  className="control-label">{label}</label>
        <div>
            <textarea {...input} className="form-control"  placeholder={label} type={type}/>
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

class SceneForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        //this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newScene.scene && !nextProps.newScene.error) {
            this.context.router.push('/');
        }
    }

    renderError(newScene) {
        if (newScene && newScene.error && newScene.error.message) {
            return (
                <div className="alert alert-danger">
                    { newScene ? newScene.error.message : '' }
                </div>
            );
        } else {
            return <span></span>
        }
    }
    render() {
        const {handleSubmit, submitting, newScene} = this.props;
        return (
            <div className='container'>
                { this.renderError(newScene) }
                <form onSubmit={ handleSubmit(validateAndCreateScene) }>
                    <Field
                        name="title"
                        type="text"
                        component={ renderField }
                        label="Title*" />
                    <Field
                        name="categories"
                        type="text"
                        component={ renderField }
                        label="Categories*" />
                    <Field
                        name="content"
                        component={ renderTextArea }
                        label="Content*" />
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={ submitting }>
                            Submit
                        </button>
                        <Link
                            to="/"
                            className="btn btn-error"> Cancel
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}


export default reduxForm({
    form: 'SceneForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    asyncValidate
})(SceneForm)

