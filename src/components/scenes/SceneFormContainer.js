import SceneForm from './SceneForm';
import { resetNewScene } from '../../actions/scenes';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        resetNewScene: () => {
            dispatch(resetNewScene());
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        newScene: state.scenes.newScene
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneForm);
