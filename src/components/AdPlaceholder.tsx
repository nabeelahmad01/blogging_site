export default function AdPlaceholder({
    size = 'horizontal',
    label = 'Advertisement'
}: {
    size?: 'horizontal' | 'vertical' | 'square';
    label?: string;
}) {
    const dimensions = {
        horizontal: { width: '100%', height: '90px' },
        vertical: { width: '300px', height: '600px' },
        square: { width: '300px', height: '250px' },
    };

    return (
        <div
            className="ad-placeholder"
            style={{
                width: dimensions[size].width,
                height: dimensions[size].height,
                maxWidth: '100%',
            }}
        >
            <span>{label}</span>
        </div>
    );
}
