package io.github.cardosogilberto.agendaapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.cardosogilberto.agendaapi.model.entity.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Integer>{

}
