import ContentLoader from "react-content-loader";

export const TransactionSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={336}
    height={89}
    viewBox="0 0 336 89"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="95" y="28" rx="3" ry="3" width="73" height="6" />
    <rect x="93" y="53" rx="3" ry="3" width="113" height="6" />
    <rect x="117" y="93" rx="3" ry="3" width="118" height="4" />
    <circle cx="47" cy="44" r="30" />
    <rect x="253" y="53" rx="3" ry="3" width="60" height="6" />
    <rect x="259" y="30" rx="3" ry="3" width="50" height="6" />
  </ContentLoader>
);
