import React, {Component} from 'react'
import SceneFormContainer from './SceneFormContainer'
import Img from 'react-image'

class SceneDetailPage extends Component {
    render(){
        return (
            <div>
                <h3>Scene Detail</h3>
                <div>For sceneId: {this.props.params.id}</div>
                <div className="container">
                <Img  src="http://i.imgur.com/2zNzP6Q.png" width={500} height={300} mode='fit' />
                </div>
                <SceneFormContainer />
            </div>
        )
    }
}

export default SceneDetailPage