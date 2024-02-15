import './index.css'

const OptionItem = props => {
  const {details, onChangeCategory} = props
  const {id, displayText} = details
  const changeCategory = () => {
    onChangeCategory(id)
  }
  return (
    <button type="button" onClick={changeCategory}>
      <option value={id}>{displayText}</option>
    </button>
  )
}
export default OptionItem
