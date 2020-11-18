import React, { Component } from 'react'

export class Slideshow extends Component {

    renderSlideShowText = (i) => {
        if(i === 0){
            return 'Quickly create list and categorize your favorite restaurants'
        } else if(i === 1){
            return 'Rate and keep notes of indivdual items'
        } else if(i === 2 ){
            return 'Share your list with your friends'
        } else {
            return 'Quickly create list and categorize your favorite restaurants'
        }
    }
    renderItems = (arr) => {
       return arr.map((e,i) => {
           return <div key={i}className="Slideshow_item">
            {e}
            <div className="Slideshow_text">
            {this.renderSlideShowText(i)}
            </div>
           </div>
       }
       )
    }

    render() {
        return (
            <div className='Slideshow'>
                {this.renderItems(this.props.imgs)}
            </div>
        )
    }
}

export default Slideshow