import CustomButton from './CustomButton';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    const buttons = [
        { type: 'outline', title: 'AI Logo' },
        { type: 'filled', title: 'AI Full' },
    ];

    return (
        <div className="aipicker-container">
            <textarea
                placeholder="Ask AI..."
                rows={5}
                value={prompt}
                onChange={({ target }) => setPrompt(target.value)}
                className="aipicker-textarea"
            />
            <div className="flex flex-wrap gap-3">
                {generatingImg ? (
                    <CustomButton
                        type="outline"
                        title="Asking AI..."
                        customStyles="text-xs"
                    />
                ) : (
                    <>
                        {buttons.map(({ type, title }) => (
                            <CustomButton
                                key={type}
                                type={type}
                                title={title}
                                handleClick={() => handleSubmit('logo')}
                                customStyles="text-sm font-bold"
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default AIPicker;
