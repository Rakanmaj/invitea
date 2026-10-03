type ArrowProps = { size?: number; className?: string };

/** A quiet, consistent directional mark for the studio's public interface. */
function EditorialArrow({ size = 26, className = '', diagonal = false }: ArrowProps & { diagonal?: boolean }) {
  return <svg className={`editorial-arrow ${diagonal ? 'is-diagonal' : ''} ${className}`} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
    <path d={diagonal ? 'M8 24 24 8M10 8h14v14' : 'M5 16h22M19 8l8 8-8 8'} stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

export function ArrowRight(props: ArrowProps) { return <EditorialArrow {...props}/>; }
export function ArrowUpRight(props: ArrowProps) { return <EditorialArrow {...props} diagonal/>; }
