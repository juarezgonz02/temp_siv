import { StepProps, Steps } from 'antd'

const SelectionSteps = ({step, items}:({step: number, items: StepProps[]})) => {
    return (
        <div className='steps-cont'>
            <Steps
                current={step}
                items={items}
            />
        </div>)
}

export default SelectionSteps