<?php

namespace App\Services;

use App\Repositories\AuthRepository;
use Log;

class AuthService
{
    protected $authRepository;

    // Injetar AuthRepository no construtor
    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function createUser(array $userData)
    {
        Log::info("Iniciando processo de criação de usuário - Service");

        // Chamar método createUser do AuthRepository
        $createdUser = $this->authRepository->createUser($userData);

        Log::info("Usuário criado com sucesso: " . $createdUser->uid);

        return $createdUser;
    }
}
