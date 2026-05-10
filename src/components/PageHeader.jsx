export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase text-[#155eef]">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black text-[#101828] sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 text-base leading-7 text-[#526071]">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
