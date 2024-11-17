import "./common.css"

export const Checkmark = ({onClick, styles={}}) => {

    return <button 
            style={styles}
            className="htmlEntityButton checkmark"
            onClick={onClick}
            >
                &#10003;
            </button>
}