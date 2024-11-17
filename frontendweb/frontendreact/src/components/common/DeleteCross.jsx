import './common.css';


export const DeleteCross = ({onClick, styles={}}) => {
    return <button style={styles} className="htmlEntityButton deleteCross" onClick={onClick}>
        &#88;
    </button>
}
