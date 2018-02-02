import React, {Component} from 'react'

class SceneDetailPage extends Component {
    render(){
        return (
            <div>
                <h3>Scene Detail</h3>
                <span>For sceneId: {this.props.params.id}</span>
            </div>
        )
    }
}

export default SceneDetailPage