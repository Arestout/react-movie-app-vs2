import React from 'react';

export default class MovieItem extends React.Component {
    render() {
        const { item } = this.props;
        const imagePath = item.backdrop_path || item.image_path;
        return (
            <div className="card" style={{ width: '100%' }}>
                <img
                    className="card-img-top card-img--height"
                    src={
                        imagePath
                            ? `https://image.tmdb.org/t/p/w500${imagePath}`
                            : 'https://image.tmdb.org/t/p/w500/j91XDQPq9spZHias8PpwVdlDxna.jpg'
                    }
                    alt=""
                />
                <div className="card-body">
                    <h6 className="card-title">{item.title}</h6>
                    <div className="card-text">Rating: {item.vote_average}</div>
                </div>
            </div>
        );
    }
}
