export default function PokeBallLoader() {
  return (
    <div
      className="
      relative w-10 h-10
      animate-[poke-spin_1s_linear_infinite]
      motion-reduce:animate-none
    "
    >
      <div className="absolute inset-0 rounded-full bg-primary shadow-pokeball" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-card" />
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-foreground -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-card border-4 border-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
