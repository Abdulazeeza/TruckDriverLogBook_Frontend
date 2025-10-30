export const LoaderIcon = ({
  className,
  fontSize = "20px",
}: {
  className: string;
  fontSize?: string;
}) => {
  return (
    <span className={`${className}`} style={{ fontSize }}>
      Loading...
    </span>
  );
};
