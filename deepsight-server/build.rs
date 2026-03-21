fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::configure()
    .build_server(false)
    .compile_protos(
        &[
            "proto/sui/rpc/v2/ledger_service.proto",
        ],
        &["proto"],
    )?;
    Ok(())
}